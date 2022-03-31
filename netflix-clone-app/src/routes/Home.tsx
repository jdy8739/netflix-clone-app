import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { fetchNowPlaying, INowPlaying } from "../api";
import { bannerAtom, movieAtom } from "../atoms";
import Modal from "../components/Modal";
import SliderList from "../components/SliderList";
import { makeImagePath } from "../utils";

export const Banner = styled.div<{ path: string }>`
    width: 100vw;
    height: 100vh;
    min-height: 800px;
    background-color: black;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: white;
    padding-left: 50px;
    box-sizing: border-box;
    background-image: 
        linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), 
        url(${ props => props.path });
    background-position: center center;
    background-size: cover;
    @media screen and (max-width: 800px) {
        min-height: 1100px;
    }
`;

export const Title = styled.h1`
    color: white;
    font-size: 120px;
    margin: 0;
`;

export const Overview = styled.p`
    font-size: 20px;
    margin: 0;
    width: 70%;
`;

export const Slider = styled.div`
    position: relative;
`;

export const Row = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 10px;
    position: absolute;
    width: 100vw;
`;

export const Box = styled(motion.div)`
    height: 150px;
    &:first-child {
        transform-origin: center left;
    };
    &:last-child {
        transform-origin: center right;
    }
`;

export const ModalBackground = styled(motion.div)`
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed;
    top: 0;
`;

export const ModalWindow = styled(motion.div)`
    background-color: white;
    width: 620px;
    height: 560px;
    border-radius: 8px;
    position: absolute;
    left: 0;
    right: 0;
    top: ${window.innerHeight - window.innerHeight / 1.2}px;
    margin: auto;
    overflow: hidden;
`;

export const Footer = styled.div<{ path: string }>`
    position: relative;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    background-image: 
    linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)), 
        url(${ props => props.path });
    background-position: center center;
    background-size: cover;
    opacity: 0.1;
    z-index: 1;
`;

export const PlayBtn = styled.button`
    background-color: transparent;
    border: 2px solid white;
    border-radius: 4px;
    padding: 6px 12px;
    color: white;
    cursor: pointer;
    opacity: 0.5;
    transition: opacity 1s;
    &:hover {
        opacity: 1;
    }
`;

export const modalVariant = {
    hidden: {
        opacity: 0,
        transition: {
            duration: 2
        }
    },
    visible: {
        opacity: 1
    },
    leave: {
        transition: {
            duration: 2
        }
    }
};

export const boxVariant = {
    hover: {
        scale: 1.4,
        y: -125,
        zIndex: 99,
        transition: {
            type: 'tween'
        }
    }
};

function Home() {
    
    let movieMatch = useMatch('/movie/:theme/:id');

    const nav = useNavigate();

    const preventBubbling = (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation();

    const banner = useRecoilValue(bannerAtom);

    const movieAtomValue = useRecoilValue(movieAtom);

    if(!movieAtomValue) movieMatch = null;

    return (
        <>
            <Banner 
            path={makeImagePath(banner ? banner.backdrop_path : '')}>
                <div>
                    <Title>{ banner ? banner.title : '' }</Title>
                    <Overview>{ banner ? banner.overview : '' }</Overview>
                    <br></br>
                    <PlayBtn>watch</PlayBtn>
                </div>
            </Banner>
            <SliderList theme={'now_playing'} position={'150px'}/>
            <SliderList theme={'top_rated'} position={'-150px'}/>
            <SliderList theme={'upcomings'} position={'-450px'}/>
            {
                movieMatch === null ? null : 
                <AnimatePresence>
                    <ModalBackground
                    key={movieMatch.params.id}
                    variants={modalVariant}
                    initial="hidden"
                    animate="visible"
                    onClick={() => nav('/')}
                    >
                        <ModalWindow 
                        layoutId={movieMatch?.params.theme ? movieMatch?.params.theme + movieMatch?.params.id : ''}
                        onClick={preventBubbling}
                        >
                            <Modal />
                        </ModalWindow>
                    </ModalBackground>
                </AnimatePresence>
            }
            <Footer 
            path={
                makeImagePath(
                    banner ? banner.backdrop_path : '')} 
            />
        </>
    )
};

export default Home;