function NavBar() {
    return (
      <nav className="bg-white h-[7vh] w-full shadow-lg rounded-none px-5 py-3 fixed top-0 left-0">
        <header className="flex justify-between items-center ">
          <div className="title">
            <h1 className="text-[1rem] md:text-[2rem] text-blue-600 font-bold">AutoCOMP</h1>
          </div>
          <div className="Links flex gap-5">
            <a href="https://github.com/AWERDdev" className="text-[1rem] md:text-[1.5rem] text-gray-800 font-bold">
              AWERDdev
            </a>
            <a href="https://github.com/AWERDdev/PythonProject" className="text-[1rem] md:text-[1.5rem] text-gray-800 font-bold">
              AppRepo
            </a>
          </div>
        </header>
      </nav>
    );
  }
  
export default NavBar