import { Link } from 'react-router-dom'

const Header = ({ heading, paragraph, linkName, linkUrl }) => {
    return (
      <div className="mb-10 flex-col justify-center max-w-fit">
        <h2>{heading}</h2>
        <p>{paragraph}
        <Link to = {linkUrl} className='font-medium text-purple-600 hover:text-purple-500'>
            {linkName}
        </Link>
        </p>
      </div>
    );
};
export default Header;
  