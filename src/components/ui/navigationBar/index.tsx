import { HomeIcon } from "@heroicons/react/20/solid";

const NavigationBar = () => {
  return (
    <div className='navContainer'>
      <ul className='navItem'>
        <HomeIcon className='navIcon' />
        <li className='navText'>Home</li>
      </ul>
    </div>
  );
};

export default NavigationBar;
