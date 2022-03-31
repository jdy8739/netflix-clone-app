import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import styled from "styled-components";
import { searchedIdAtom } from "../atoms";
import SearchedBox from "../components/SearchedBox";
import SearchModal from "../components/SearchModal";
import { fetchSearched, ISearched, ISearchedResult } from "../searchApi";
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

    const {isLoading, data} = useQuery<ISearched>(['searched', keyword], () => fetchSearched(keyword || ''));
    console.log(data);

    const [isModalShown, setIsModalShown] = useState(false);

    const [clicked, setClicked] = useState<ISearchedResult | null>();

    const showModal = (id: number) => {
        setIsModalShown(true);
        setClicked(() => findClicked(id));
    };

    const findClicked = (id: number) => data?.results.find(datum => datum.id === id);

    const preventBubbling = (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation();

    const hideModal = () => {
        setClicked(null);
    };

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
                                            layoutId={res.id + ''}
                                            >
                                                <SearchResBox 
                                                key={ i } 
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
                            {
                                !clicked ? null :
                                <AnimatePresence>
                                    <ModalBackground
                                    variants={modalVariant}
                                    initial="hidden"
                                    animate="visible"
                                    onClick={hideModal}
                                    >   
                                        <ModalWindow
                                        onClick={preventBubbling}
                                        layoutId={clicked?.id + ''}
                                        >
                                            {
                                                clicked ? 
                                                <SearchModal clicked={ clicked }/> 
                                                : null
                                            }
                                        </ModalWindow>
                                    </ModalBackground>
                                </AnimatePresence>
                            }
                        </>
                    }
                </>
            }
        </>
    )
};

export default Search;