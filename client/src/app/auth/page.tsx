'use client'
import AuthForm from "@/components/AuthForm/AuthForm";
import { useState } from "react";


export default function Auth() {
  const [formState, setFormState] = useState(true);
  
  const handleFormSwitch = (state: boolean) => {
    setFormState(state);
  };
  return (
        <>
      <div className="mx-auto p-6 ">
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => handleFormSwitch(true)}
            className={`py-2 px-4 rounded-lg ${formState === true ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Вхід
          </button>
          <button
            onClick={() => handleFormSwitch(false)}
            className={`py-2 px-4 rounded-lg ${formState === false ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Реєстрація
          </button>
        </div>

        <div className="items-center min-h-screen">
            <AuthForm stateAuth={formState}/>
        </div>      
      </div>
    </>
    );
}