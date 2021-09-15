import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import css from './ContactForm.module.css';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  nameInputId = uuidv4();
  numberInputId = uuidv4();

  handleFormChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handleOnSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state);
    this.formReset();
  };

  formReset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;

    return (
      <div className={css.container}>
        <form className={css.form} onSubmit={this.handleOnSubmit}>
          <label className={css.label} htmlFor={this.nameInputId}>
            Name
            <input
              type="text"
              placeholder="Mark Zuckerberg"
              name="name"
              value={name}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
              required
              onChange={this.handleFormChange}
              className={css.input}
              id={this.nameInputId}
            />
          </label>

          <label className={css.label} htmlFor={this.numberInputId}>
            Number
            <input
              type="tel"
              placeholder="xxx-xx-xx"
              name="number"
              value={number}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
              required
              onChange={this.handleFormChange}
              className={css.input}
              id={this.numberInputId}
            />
          </label>

          <button type="submit" className={css.btn}>
            Add contact
          </button>
        </form>
      </div>
    );
  }
}
