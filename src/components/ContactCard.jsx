import React from 'react'
import { HiOutlineUserCircle } from "react-icons/hi";
import { FaTrash } from "react-icons/fa";
import { RiEditCircleLine } from "react-icons/ri";
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import useDisclouse from '../hooks/useDisclouse';
import AddAndUpdateContact from './AddAndUpdateContact';
import { toast } from "react-toastify"

const ContactCard = ({contact}) => {

  const {isOpen, onClose, onOpen, isUpdate} = useDisclouse();

    const deleteContact = async (id) => {
        try {
            await deleteDoc(doc(db,"contact",id));
            toast.success("contacat successfully deleted")
        } catch (error) {
            console.log(error);
        }
    };

  return (
    <div key={contact.id} className="flex items-center justify-between rounded-lg  bg-yellow">
    <HiOutlineUserCircle className="text-orange text-5xl " />
    <div className="flex gap-1">
      <div className="">
        <h2 className="font-medium">{contact.name}</h2>
        <p className="text-sm">{contact.email}</p>
        <p>{contact.number}</p>
      </div>
      <div className="flex text-2xl mt-5 px-7">
        <RiEditCircleLine onClick={onOpen} className='cursor-pointer' />
        <FaTrash onClick={()=> deleteContact(contact.id)} className="text-blue-600 mx-2 cursor-pointer"/>
      </div>
    </div>
    <AddAndUpdateContact isUpdate contact={contact} isOpen={isOpen} onClose={onClose}/>
  </div>
 
  );
};

export default ContactCard