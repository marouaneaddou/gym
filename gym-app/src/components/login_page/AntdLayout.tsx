import { Link } from 'react-router-dom';
import Background from "../../assets/gymphoto5.jpg";

const MainLayout: React.FC = () => {
  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${Background})`,
      }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-0" />

      {/* Header */}
      <header className="relative z-10 bg-[#1C1C1C]/80 backdrop-blur-md border border-white rounded-2xl shadow-2xl p-8 mb-5 mx-4 mt-4 flex items-center justify-between">
        <div className="text-lg text-[#D7FD52] font-bold">MyApp</div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="text-[#D7FD52] hover:text-[#B7EB00]">
                Home
              </Link>
            </li>
            <li>
              <Link to="/login" className="text-[#D7FD52] hover:text-[#B7EB00]">
                Login
              </Link>
            </li>
            <li>
              <Link to="/inscription" className="text-[#D7FD52] hover:text-[#B7EB00]">
                Inscription
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Content */}
      <main className="relative z-10 flex-grow px-6 py-8">
        <div className="rounded-lg p-6 min-h-[280px] bg-[#1C1C1C]/80 text-white shadow-lg">
         <h1 className='text-center md:text-6xl font-bold text-white mb-4 '>Transform Your
          <span className='text-[#D7FD52] block'>Fitness Journey</span></h1>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
