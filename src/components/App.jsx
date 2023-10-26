import { Component } from "react";
import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";
import {nanoid} from 'nanoid';

export class App extends Component {
   state = {
   contacts: [],
   filter: '',
  }

   handleAddContact = contact => {
     const finalContacts = {
     ...contact,
    id: nanoid(),
    };
    
    const hasRepeateContact = this.state.contacts.some(
      item => item.name.toLowerCase() === contact.name.toLowerCase()
      )
              
     if (hasRepeateContact) {
     alert(`${contact.name} is already in contacts!`)
     }
    else {
    this.setState(prevState => ({
        contacts: [...prevState.contacts, finalContacts],
    }));
 }
}

    changeInputFilter = event => {
        this.setState({filter: event.target.value});
    }

    findContactsByName = () => {
        const {filter, contacts} = this.state;
        return contacts.filter(contact => 
            contact.name.toLowerCase().includes(filter.toLowerCase())
            );
    }

    handleDeleteContact = contactId => {
        this.setState({
            contacts: this.state.contacts.filter(contact => contact.id !== contactId)
        })
    }

   render() {
    return (
    <div>
    <h1>Phonebook</h1>        
    < ContactForm handleAddContact={this.handleAddContact}/>
    <h2>Contacts</h2>
    < Filter filter={this.state.filter} changeInputFilter={this.changeInputFilter} />
    < ContactList  contacts={this.findContactsByName()}
    handleDeleteContact={this.handleDeleteContact}/>
    </div>
    )
   }
}