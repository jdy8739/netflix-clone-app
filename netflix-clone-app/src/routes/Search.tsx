import { useQuery } from "react-query";
import { useLocation } from "react-router";
import styled from "styled-components";
import { fetchSearched, ISearched } from "../searchApi";

const Alert = styled.p`
    color: white;
    font-size: 15px;
    position: fixed;
    left: 0;
    right: 0;
    top: 50vh;
    margin: auto;
    text-align: center;
`;

function Search() {

    const location = useLocation();
    
    const keyword = new URLSearchParams(location.search).get('keyword');

    const {isLoading, data} = useQuery<ISearched>(['searched', keyword], () => fetchSearched(keyword || ''));
    console.log(data);
    return (
        <>
            {
                isLoading ? <Alert>Loading results. Please wait.</Alert> :
                <>
                    {
                        data?.results.length === 0 ? 
                        <Alert>Sorry. No Searched Result :(</Alert> : 
                        <>

                        </>
                    }
                </>
            }
        </>
    )
};

export default Search;