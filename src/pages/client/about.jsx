import Header from "../../components/header";

export default function About() {
    return (
        <>
            <Header />

            {/* Banner Section */}
            <div
                className="
                w-full 
                h-[75vh] 
                bg-[url('/bg16.jpg')] 
                bg-cover 
                bg-center 
                bg-no-repeat 
                rounded-b-3xl 
                flex 
                justify-center 
                items-center 
                shadow-xl
            "
            >
                <h1 className="text-5xl md:text-6xl text-white font-serif font-bold drop-shadow-lg tracking-wide">
                    About ISH Cosmetics
                </h1>
            </div>

            {/* About Section */}
            <div className="w-full px-6 md:px-20 py-16 flex flex-col items-center text-center">
                <h2 className="text-4xl font-serif font-bold text-primary mb-6">
                    Our Story
                </h2>

                <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-[Poppins] max-w-4xl">
                    At <span className="font-semibold text-secondary">ISH Cosmetics</span>, 
                    we believe that beauty begins with confidence. Our brand was created to empower 
                    individuals through luxurious, high-quality skincare and cosmetics designed with 
                    passion and precision.
                    <br /><br />
                    Inspired by global beauty trends and powered by nature’s finest ingredients, 
                    ISH Cosmetics is committed to delivering safe, elegant, and transformative 
                    beauty essentials for your daily routine.
                </p>
            </div>

            {/* Mission + Vision Section */}
            <div className="w-full px-6 md:px-20 py-10 grid grid-cols-1 md:grid-cols-2 gap-12">
                
                {/* Mission */}
                <div className="p-10 rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300">
                    <h3 className="text-3xl font-serif font-bold text-secondary mb-4">
                        Our Mission
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed font-[Poppins]">
                        To inspire confidence and celebrate individuality by offering premium, 
                        ethically crafted cosmetics that blend modern science with timeless beauty.
                    </p>
                </div>

                {/* Vision */}
                <div className="p-10 rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300">
                    <h3 className="text-3xl font-serif font-bold text-secondary mb-4">
                        Our Vision
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed font-[Poppins]">
                        To become a globally trusted beauty brand known for innovation, sustainability, 
                        and exceptional quality that empowers individuals worldwide.
                    </p>
                </div>
            </div>

            {/* Why Choose Us Section */}
            <div className="w-full px-6 md:px-20 py-16 bg-primary/20">
                <h2 className="text-4xl font-serif font-bold text-center text-accent mb-12">
                    Why Choose ISH Cosmetics?
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    
                    {/* Card 1 */}
                    <div className="p-10 rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 text-center">
                        <h4 className="text-2xl font-semibold text-secondary mb-4 font-[Poppins]">
                            Premium Quality
                        </h4>
                        <p className="text-gray-700 font-[Poppins]">
                            Clean, safe, dermatologist-tested formulas crafted  
                            with precision and care.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="p-10 rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 text-center">
                        <h4 className="text-2xl font-semibold text-secondary mb-4 font-[Poppins]">
                            Trend-Inspired Design
                        </h4>
                        <p className="text-gray-700 font-[Poppins]">
                            Products created with a modern aesthetic  
                            and elegant appeal.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="p-10 rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 text-center">
                        <h4 className="text-2xl font-semibold text-secondary mb-4 font-[Poppins]">
                            Cruelty-Free
                        </h4>
                        <p className="text-gray-700 font-[Poppins]">
                            We never test on animals — because beauty  
                            should be compassionate.
                        </p>
                    </div>

                </div>
            </div>

            {/* Footer */}
            <div className="w-full py-10 text-center text-gray-600 font-[Poppins]">
                © {new Date().getFullYear()} ISH Cosmetics — All Rights Reserved.
            </div>
        </>
    );
}
