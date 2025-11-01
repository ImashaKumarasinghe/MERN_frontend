export default function SignUpPage() {
  return (
    <div className='w-full h-screen bg-blue-100 flex justify-center items-center'>
      <div className='w-96 h-96 bg-white shadow-md rounded-md flex flex-col justify-center items-center'>
        <h2 className='text-2xl font-bold mb-4'>Signup</h2>
        <form className='flex flex-col'>
          <input type='text' placeholder='Username' className='mb-4 p-2 border border-gray-300 rounded-md' />
          <input type='email' placeholder='Email' className='mb-4 p-2 border border-gray-300 rounded-md' />
          <input type='password' placeholder='Password' className='mb-4 p-2 border border-gray-300 rounded-md' />
          <button type='submit' className='bg-blue-500 text-white p-2 rounded-md'>Signup</button>
        </form>
      </div>
    </div>
  );
}
