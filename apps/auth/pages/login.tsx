import { useSearchParams } from 'next/navigation';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
type Inputs = {
  email: string;
  password: string;
};

const handleLogin = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) =>
  fetch('/oauth/handle-login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  }).then((res) => res.json());

const Page = () => {
  const { register, handleSubmit } = useForm<Inputs>();

  const sp = useSearchParams();
  const mutation = useMutation({
    mutationKey: ['handleLogin'],
    mutationFn: handleLogin,
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutation.mutate(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess() {
          const callback = sp?.get('redirect_uri');
          const scope = sp?.get('scope');
          const state = sp?.get('state');
          const clientId = sp?.get('client_id');
          window.location.href = `/oauth/authorize?redirect_uri=${callback}&scope=${scope}&client_id=${clientId}&state=${state}`;
        },
      }
    );
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
