import styled from "styled-components";
import { text1 } from "../styles/typography";

export default function SearchBar({
                                    value,
                                    onChange,
                                    onSearch,
                                    placeholder,
                                    searchIconSrc = "/images/Search.svg",
                                  }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch?.(value.trim());
  };

  return (
    <SearchForm onSubmit={handleSubmit}>
      <SearchInput
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
      />

      <SearchButton type="submit" aria-label="검색">
        <Divider/>
        <SearchIcon src={searchIconSrc} alt="" aria-hidden="true"/>
      </SearchButton>
    </SearchForm>
  );
}

const SearchForm = styled.form`
  display: flex;
  width: 100%;
  height: 48px;
  padding: 10px 18px;
  justify-content: space-between;
  align-items: center;

  border-radius: 25px;
  border: 1px solid var(--Gray, #BDBDBD);
  background: transparent;
  overflow: hidden;
`;

const SearchInput = styled.input`
  ${text1};
  flex: 1;
  height: 100%;
  min-width: 0;
  padding: 0;
  border: 0;
  outline: 0;
  background: transparent;
  &::placeholder {
    color: var(--Gray);
    opacity: 1;
  }
`;

const SearchButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  align-self: stretch;
  padding: 0;
  
  border: 0;
  background: transparent;
  cursor: pointer;
`;

const Divider = styled.div`
  width: 1px;
  height: 100%;
  background-color: var(--Gray);
`;

const SearchIcon = styled.img`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
`;