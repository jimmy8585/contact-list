import React from "react";
import Modal from "./Modal";
import { ErrorMessage, Field, Form, Formik} from "formik";
import { addDoc, collection, updateDoc,doc } from "firebase/firestore";
import { db } from '../config/firebase';
import { toast } from 'react-toastify';
import * as Yup from "yup";




const contactSchemaValidation = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  number:Yup.number().required("number should be required"),
  email:Yup.string().email("invalid email").required("email is required")
})


const AddAndUpdateContact = ({ isOpen, onClose, isUpdate, contact }) => {


    const addContact = async (contact) => {

        try {
            const contactRef = collection(db, "contact")
            await addDoc(contactRef,contact)
            toast.success("contact added successfully")
            onClose();
        } catch (error) {
            console.log(error)
            
        }
    };

   // update function 
    const UpdateContact = async (contact, id) => {

      try {
          const contactRef = doc(db, "contact", id)
          await updateDoc(contactRef,contact);
         
          onClose();
          toast.success("Contact update successfully");
      
        } catch (error) {
          console.log(error);
          
      }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
          validationSchema={contactSchemaValidation}
          initialValues={isUpdate ? {
            name: contact.name,
            number: contact.number,
            email: contact.email,
          }:{
            name: "",
            number: "",
            email: "",
          }
        }
          onSubmit={(values) => {
            console.log(values);

            isUpdate ? UpdateContact(values, contact.id) : addContact(values);
          }
        }
        >
          <Form className="flex flex-col gap-2">
            <div className="flex flex-col">
              <label htmlFor="name">Name</label>
              <Field name="name" className="h-6 border m-1" />
              <div className="text-xs text-red-500">
                <ErrorMessage name="name"/>
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="number">Number</label>
              <Field type="number" name="number" className="h-6 border m-1" />
              <div className="text-xs text-red-500">
                <ErrorMessage name="number" />
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" for="FORM_ELEMENT">Email</label>
              <Field type="email" name="email" className="h-6 border m-1" />
              <div className="text-xs text-red-500">
                <ErrorMessage name="email" />
              </div>
            </div>
            <div className="border rounded bg-amber-500 text-dark self-end px-3 py-1.5">
              <button type="submit">{isUpdate ? "Update" : "Add"} Contact</button>
            </div>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default AddAndUpdateContact;
