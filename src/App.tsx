import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import './App.css';

type Inputs = {
  nameForm: string;
  ageForm: string;
}

function App() {

  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const [name, setName] = useState<string | undefined>('Visitante');
  
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    setName(data.nameForm);
  }

  // watch input value by passing the name of it
  console.log(watch("nameForm")); 

  return (
    <div className="container" onSubmit={handleSubmit(onSubmit)}>
      <form className="form">

        <h1>Hello, {name}</h1>

        <input type="text" id="name" placeholder="Name" defaultValue="Joe" {...register("nameForm")} />
        <input type="text" id="age" placeholder="Age" {...register("ageForm", {required: true})} />

        {errors.ageForm && <span> This field is required</span>}

        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
