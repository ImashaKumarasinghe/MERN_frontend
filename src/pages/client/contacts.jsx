import Header from "../../components/header"

export default function Contacts() {
    return (
        <div className="w-full min-h-screen bg-[#F9F5F7] font-[Playfair] text-[#432323]">

            <Header />

            {/* 3/4-Screen Section Using Background Image */}
            <div className="
                w-full 
                h-[75vh] 
                bg-[url('/bg11.jpg')] 
                bg-cover 
                bg-center 
                bg-no-repeat 
                rounded-b-3xl 
                flex 
                justify-center 
                items-center 
                shadow-xl
            ">
                <h1 className="text-5xl md:text-6xl text-white font-bold drop-shadow-lg">
                    Contact Us
                </h1>
            </div>

            {/* Contact Details */}
            <div className="max-w-6xl mx-auto px-6 py-14">
                <div className="bg-white rounded-3xl shadow-xl p-10 md:p-16">

                    <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-[#92487A]">
                        Get in Touch
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

                        {/* Phone */}
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-[#FFC4C4] rounded-full flex justify-center items-center shadow-md">
                                <span className="text-3xl">📞</span>
                            </div>
                            <h3 className="text-xl font-semibold mt-4">Phone</h3>
                            <p className="text-lg text-gray-700 mt-2">+94 71 234 5678</p>
                        </div>

                        {/* Email */}
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-[#FFC4C4] rounded-full flex justify-center items-center shadow-md">
                                <span className="text-3xl">📧</span>
                            </div>
                            <h3 className="text-xl font-semibold mt-4">Email</h3>
                            <p className="text-lg text-gray-700 mt-2">support@ishcosmetics.com</p>
                        </div>

                        {/* Location */}
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-[#FFC4C4] rounded-full flex justify-center items-center shadow-md">
                                <span className="text-3xl">📍</span>
                            </div>
                            <h3 className="text-xl font-semibold mt-4">Location</h3>
                            <p className="text-lg text-gray-700 mt-2">Colombo, Sri Lanka</p>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
}
