import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import css from './App.module.css';
import { RiContactsBook2Fill } from 'react-icons/ri';
import { IoMdContacts } from 'react-icons/io';

import { ContactForm } from './ContactForm';
import { Filter } from './Filter';
import { ContactList } from './ContactList';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  formSubmitHandler = data => {
    data = { id: uuidv4(), ...data };

    if (this.state.contacts.find(item => item.name === data.name)) {
      return alert(`${data.name + ' is already in contacts'}`);
    } else {
      return this.setState({ contacts: [...this.state.contacts, data] });
    }
  };

  removeContactHandler = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(item => item.id !== id),
    }));
  };

  handleFilterChange = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(item =>
      item.name.toLowerCase().includes(normalizedFilter),
    );
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = this.getFilteredContacts();

    return (
      <div className={css.container}>
        <h1 className={css.title}>
          Phonebook <RiContactsBook2Fill className={css.icon} />
        </h1>
        <ContactForm contacts={contacts} onSubmit={this.formSubmitHandler} />

        <Filter value={filter} onChange={this.handleFilterChange} />
        <h2 className={css.title}>
          Contacts
          <IoMdContacts className={css.icon} />
        </h2>
        <ContactList
          contacts={filteredContacts}
          onDeleteBtnPush={this.removeContactHandler}
        />
      </div>
    );
  }
}
