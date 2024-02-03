import React from "react";
import Navbar from "./components/Navbar";
import { IoSearchOutline } from "react-icons/io5";
import { FaCirclePlus } from "react-icons/fa6";
import { useState } from "react";
import { useEffect } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";

import ContactCard from "./components/ContactCard";
import AddAndUpdateContact from "./components/AddAndUpdateContact";
import useDisclouse from "./hooks/useDisclouse";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContactNotFound from "./components/ContactNotFound";

const App = () => {
  const [contact, setContact] = useState([]);

  const {isOpen, onClose, onOpen} = useDisclouse();

  
  useEffect(() => {
    const getContact = async () => {
      try {
        const contactRef = collection(db, "contact");
        // const contactSnapshot = await getDocs(contactRef);

        onSnapshot(contactRef,(snapshot)=>{
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContact(contactLists);
          return contactLists;
        });
      
      } catch (error) {
        console.log(error);
      }
    };
    getContact();
  }, []);

  // search filter add
  const filterContact = (e) => {
    const value = e.target.value;

    const contactRef = collection(db, "contact");
        // const contactSnapshot = await getDocs(contactRef);

        onSnapshot(contactRef,(snapshot)=>{
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          
          

          const filteredContact = contactLists.filter((contact)=>
            contact.name.toLowerCase().includes(value.toLowerCase())
          );
          
          
          setContact(filteredContact);


          return filteredContact;
        });

  };

  return (
    <>
      <div className="mx-auto max-w-[370px] px-4">
        <Navbar />

        <div className="flex gap-2">
          <div className="flex  relative items-center">
            <IoSearchOutline className="ml-1 text-3xl text-white absolute" />
            <input onChange={filterContact}
              type="text"
              className=" flex-grow h-10 rounded-md border border-white bg-transparent text-white pl-10"
            />
          </div>

          <FaCirclePlus onClick={onOpen} className="text-5xl text-white cursor-pointer " />
        </div>
        <div className="mt-4 flex flex-col gap-4">
          {contact.length <= 0 ? <ContactNotFound /> : contact.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      </div>
      <AddAndUpdateContact onClose={onClose} isOpen={isOpen} />
      <ToastContainer position="bottom-center" />
    </>
  );
};

export default App;
