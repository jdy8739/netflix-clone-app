import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router";
import styled from "styled-components";
import SearchedBox from "../components/SearchedBox";
import SearchModal from "../components/SearchModal";
import { BASE_URL, fetchSearched, ISearched, ISearchedResult, KEY } from "../searchApi";
import { ModalBackground, modalVariant, ModalWindow } from "./Home";

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
    background-color: #363636;
    margin: 10px;
    border-radius: 12px;
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

    const {isLoading, data} = useQuery<ISearched>(
        ['searched', keyword], () => fetchSearched(keyword || ''));

    const lastPage = data?.total_pages || 0;

    const [page, setPage] = useState(2);
    
    const [clicked, setClicked] = useState<ISearchedResult | null>();

    const showModal = (id: number) => {
        setClicked(() => findClicked(id));
    };

    const findClicked = (id: number) => data?.results.find(datum => datum.id === id);

    const preventBubbling = (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation();

    const hideModal = () => setClicked(null);

    const handleScroll = async () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;

        if(scrollTop + clientHeight >= scrollHeight && page <= lastPage) {
            axios.get(
                `${BASE_URL}/multi?api_key=${KEY}&query=${keyword}&language=en-US&page=${page}`)
                .then(res => {
                    data?.results.splice(data.results.length, 0, ...res.data.results);
                    setPage(page => page + 1);
                });
        };
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
    });

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
                                            <motion.span
                                            key={ i }
                                            layoutId={res.id + ''}
                                            >
                                                <SearchResBox 
                                                bigSize={ i % 4 === 0 || (i + 1) % 4 === 0 }
                                                onClick={() => showModal(res.id)}
                                                >
                                                    <SearchedBox searched={res}/>
                                                </SearchResBox>
                                            </motion.span>
                                        )
                                    })
                                }
                            </div>
                            <AnimatePresence>
                                {
                                    !clicked ? null :
                                    <ModalBackground
                                    variants={modalVariant}
                                    initial="hidden"
                                    animate="visible"
                                    exit="leave"
                                    onClick={hideModal}
                                    >   
                                        <ModalWindow
                                        onClick={preventBubbling}
                                        layoutId={clicked?.id + ''}
                                        >
                                            <SearchModal clicked={ clicked }/>
                                        </ModalWindow>
                                    </ModalBackground>
                                }
                            </AnimatePresence>
                        </>
                    }
                </>
            }
        </>
    )
};

export default Search;