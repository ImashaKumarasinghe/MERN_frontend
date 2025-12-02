import Header from '../components/header'

export default function HomePage() {
  return (
               
    <div className='w-full min-h-screen flex flex-col'>
       <Header />
      <div className="w-full flex-1 flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Store</h1>
        <p className="text-gray-600 text-center max-w-2xl">
          Browse our amazing collection of products.  
          Click on "Products" in the menu to see what we have in stock! 
        </p>
      </div>
    </div>
    
  );
}