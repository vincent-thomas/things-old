import { useSearchParams } from 'next/navigation';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

type Inputs = {
  email: string;
  password: string;
};

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const sp = useSearchParams();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const result = await fetch('/oauth/handle-login', {
      method: 'POST',
      body: JSON.stringify({ email: data.email, password: data.password }),
    });
    const back = await result.json();
    const callback = sp?.get('callback_uri');
    const scopes = sp?.get('scopes');
    const state = sp?.get('state');
    const clientId = sp?.get('client_id');
    window.location.href = `/oauth/authorize?callback_uri=${callback}&scopes=${scopes}&client_id=${clientId}&state=${state}`;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="email" {...register('email')} />
      <input type="password" {...register('password')} />
      <button type="submit">testing</button>
    </form>
  );
};

export default Page;
