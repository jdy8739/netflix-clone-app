import { useQuery } from "react-query";
import { useLocation } from "react-router";
import styled from "styled-components";
import SearchedBox from "../components/SearchedBox";
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

const SearchResBox = styled.div<{ bigSize?: boolean }>`
    width: ${ props => props.bigSize ? '61%' : '35%' };
    height: 175px;
    margin: 10px;
    display: inline-block;
    @media screen and (max-width: 1500px) {
        width: ${ props => props.bigSize ? '61%' : '33%' };
    }
    @media screen and (max-width: 600px) {
        width: 100%;
    }
    vertical-align: top;
`;

const Result = styled.h2`
    color: white;
    font-size: 24px;
    text-align: center;
    margin-top: 150px;
`;

const Keyword = styled.span`
    color: red;
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
                            <Result>Results for "<Keyword>{ keyword }</Keyword>"</Result>
                            <div style={{
                            width: '70%',
                            minWidth: '768px',
                            margin: '30px auto'
                        }}>
                                {
                                    data?.results.map((res, i) => {
                                        return (
                                            <SearchResBox 
                                            key={ i } 
                                            bigSize={ i % 4 === 0 || (i + 1) % 4 === 0 }
                                            >
                                                <SearchedBox
                                                searched={res}
                                                />
                                            </SearchResBox>
                                        )
                                    })
                                }
                            </div>
                        </>
                    }
                </>
            }
        </>
    )
};

export default Search;