import React, { useState } from 'react';
import s from './SearchBar.module.css';
import { AiOutlineSearch } from 'react-icons/ai';
import { toast } from 'react-toastify';

//new SearchBar write on react hooks. I use useState.
export default function SearchBar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');
  const handleInputChange = event => {
    setSearchQuery(event.currentTarget.value.toLowerCase());
  };
  const handleSubmit = event => {
    event.preventDefault();
    if (searchQuery.trim() === '') {
      toast.warning('I do not know what you want !');

      return;
    }

    onSubmit(searchQuery);
    setSearchQuery({ searchQuery: '' });
  };

  return (
    <header className={s.header}>
      <form onSubmit={handleSubmit} className={s.form}>
        <button type="submit" className={s.button}>
          <span className={s.label}>
            <AiOutlineSearch className={s.icon} />
          </span>
        </button>

        <input
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="searchQuery"
          value={searchQuery}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
}
//  old SearchBar write on the class.

// class SearchBar extends Component {
//   state = {
//     searchQuery: '',
//   };
//   handleInputChange = event => {
//     this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
//   };

// handleSubmit = event => {
//   event.preventDefault();
//   if (this.state.searchQuery.trim() === '') {
//     toast.warning('I do not know what you want !');

//     return;
//   }

//   console.log(this.state);
//   this.props.onSubmit(this.state.searchQuery);
//   this.setState({ searchQuery: '' });
// };

// render() {
//   return (
//     <header className={s.header}>
//       <form onSubmit={this.handleSubmit} className={s.form}>
//         <button type="submit" className={s.button}>
//           <span className={s.label}>
//             <AiOutlineSearch className={s.icon} />
//           </span>
//         </button>

//         <input
//           className={s.input}
//           type="text"
//           autoComplete="off"
//           autoFocus
//           placeholder="Search images and photos"
//           name="searchQuery"
//           value={this.state.searchQuery}
//           onChange={this.handleInputChange}
//         />
//       </form>
//     </header>
//   );
// }
// }
