import React, { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

const CONTACTS_KEY = 'contacts';
export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  onSubmitForm = ({ name, number }) => {
    const contactItem = {
      id: nanoid(),
      name,
      number,
    };

    if (
      this.state.contacts
        .map(contact => contact.name.toLowerCase())
        .includes(contactItem.name.toLowerCase())
    ) {
      alert(`${name} is already in contacts.`);
      return;
    }

    this.setState(prevstate => ({
      contacts: [...prevstate.contacts, contactItem],
    }));
  };

  onFiltering = event => {
    this.setState({ filter: event.currentTarget.value.toLowerCase() });
  };

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  async componentDidMount() {
    const data = localStorage.getItem(CONTACTS_KEY);

    try {
      if (data) {
        this.setState({
          contacts: JSON.parse(data),
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState?.contacts !== this.state.contacts) {
      localStorage.setItem(CONTACTS_KEY, JSON.stringify(this.state.contacts));
    }
  }

  render() {
    return (
      <article>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.onSubmitForm} />
        <h2>Contacts</h2>
        <Filter onFilter={this.onFiltering} />
        <ContactList
          contacts={this.getFilteredContacts()}
          deleteContact={this.deleteContact}
        />
      </article>
    );
  }
}
