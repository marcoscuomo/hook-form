import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import './App.css';

type Inputs = {
  nameForm: string;
  ageForm: number;
}

const schema = yup.object({
  nameForm: yup.string().required(),
  ageForm: yup.number().positive().integer().required()
}).required();

function App() {

  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>({
    resolver: yupResolver(schema)
  });
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
        <p>{errors.nameForm?.message}</p>

        <input type="number" id="age" placeholder="Age" {...register("ageForm", {required: true})} />
        <p>{errors.ageForm?.message}</p>

        {errors.ageForm && <span> This field is required</span>}

        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
