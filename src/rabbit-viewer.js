import React, { Component } from 'react';
import Mqtt from 'mqtt';

const utf8Decoder = new TextDecoder('utf-8');

export default class RabbitViewer extends Component {
  state = {
    error: null,
    client: null,
    subscriptions: []
  };

  withErrorHandling = fn => (...args) => {
    try {
      return fn(...args);
    } catch (error) {
      console.error(error);
      this.setState({ error });
    }
  };

  withFormHandling = fn =>
    this.withErrorHandling(event => {
      event.preventDefault();

      const data = [...Array(event.target.length).keys()].reduce((acc, index) => {
        const field = event.target[index];

        if (!field.name) {
          return acc;
        }

        return {
          ...acc,
          [field.name]: field.value
        };
      }, {});

      return fn(data);
    });

  connect = this.withFormHandling(({ url }) => {
    const client = Mqtt.connect(url);

    client.on('connect', () => this.setState({ client }));

    client.on('message', (topic, message) => {
      this.setState(prevState => ({
        subscriptions: prevState.subscriptions.map(subscription => {
          if (subscription.topic !== topic) {
            return subscription;
          }

          return {
            ...subscription,
            messages: [...subscription.messages, utf8Decoder.decode(message)]
          };
        })
      }));
    });
  });

  endClient = this.withErrorHandling(() => {
    this.state.client.end(false, () =>
      this.setState({
        client: null
      })
    );
  });

  disconnect = this.withErrorHandling(() => {
    const { client, subscriptions } = this.state;

    if (subscriptions.length > 0) {
      client.unsubscribe(subscriptions.map(({ topic }) => topic), () => this.endClient());
    } else {
      this.endClient();
    }
  });

  publish = this.withFormHandling(({ topic, message }) => {
    document.getElementById('publish-message').value = '';
    this.state.client.publish(topic, message, { qos: 2 });
  });

  subscribe = this.withFormHandling(({ topic }) => {
    document.getElementById('subscribe-topic').value = '';

    const { client, subscriptions } = this.state;

    if (subscriptions.some(subscription => subscription.topic === topic)) {
      return;
    }

    client.subscribe(topic, { qos: 2 }, (_error, incomingSubscriptions) => {
      this.setState(prevState => ({
        subscriptions: [
          ...prevState.subscriptions,
          ...incomingSubscriptions.map(subscription => ({
            topic: subscription.topic,
            messages: []
          }))
        ]
      }));
    });
  });

  unsubscribe = this.withErrorHandling(topic => {
    this.state.client.unsubscribe(topic, () =>
      this.setState(({ subscriptions }) => ({
        subscriptions: subscriptions.filter(subscription => subscription.topic !== topic)
      }))
    );
  });

  render() {
    const { error, client, subscriptions } = this.state;

    if (error) {
      return (
        <p>
          Oops, something went wrong! <a href="/">Reload</a>
        </p>
      );
    }

    if (client === null) {
      return (
        <form onSubmit={this.connect}>
          <label htmlFor="url">URL*:</label>{' '}
          <input id="url" name="url" placeholder="ws://" defaultValue="http://localhost:15675/ws" required />{' '}
          <input type="submit" value="Connect" />
        </form>
      );
    }

    return (
      <div>
        <div>
          <h2>Status</h2>
          <div>
            Connected to {`${client.options.href} `}
            <button type="button" onClick={this.disconnect}>
              Disconnect
            </button>
          </div>
        </div>
        <div>
          <h2>Publish</h2>
          <form onSubmit={this.publish}>
            <div>
              <label htmlFor="publish-topic">Topic*:</label> <input id="publish-topic" name="topic" required />
            </div>
            <div>
              <label htmlFor="publish-message">Message*:</label> <input id="publish-message" name="message" required />
            </div>
            <input type="submit" value="Publish" />
          </form>
        </div>
        <div>
          <h2>Subscribe</h2>
          <form onSubmit={this.subscribe}>
            <label htmlFor="subscribe-topic">Topic*:</label>{' '}
            <input id="subscribe-topic" name="topic" required defaultValue="foo" />{' '}
            <input type="submit" value="Subscribe" />
          </form>
          <div className="topic-info">
            {subscriptions.map(({ topic, messages }) => (
              <div key={topic}>
                Message count for <strong>{topic}</strong>: {messages.length}{' '}
                <button type="button" onClick={() => this.unsubscribe(topic)}>
                  Unsubscribe
                </button>
                <ul className="message-list">
                  {messages.map((message, index) => (
                    <li key={index}>{message}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
