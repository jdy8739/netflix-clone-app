import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { fetchNowPlaying, fetchTopRated, fetchUpcoming, ITopRated } from "../api";
import { bannerAtom, movieAtom } from "../atoms";
import { Box, Row, Slider } from "../routes/Home";
import { fetchTvPopular } from "../tvApi";
import SlideBox from "./SlideBox";

const NextBtn = styled.div`
    width: 50px;
    height: 30px;
    border-radius: 50%;
    position: absolute;
    top: -50px;
    right: 30px;
    color: white;
    font-weight: bold;
    cursor: pointer;
`;

const SlideTitle = styled(NextBtn)`
    left: 30px;
`;

const BOX_OFFSET = 1;

const NUM_OF_BOX_IN_A_ROW = 6;

const boxVariant = {
    hover: {
        scale: 1.4,
        y: -125,
        zIndex: 99,
        transition: {
            type: 'tween'
        }
    }
};

function SliderList({ theme, position }: { theme?: string, position?: string }) {

    const sliderVariant = {
        hidden: { x: window.innerWidth + 10 },
        visible: { x: 0 },
        exit: { x: -window.innerWidth - 10 }
    };

    let fetcherFunction: any;
    switch (theme) {
        case 'now_playing':
            fetcherFunction = fetchNowPlaying;
            break;
        case 'top_rated':
            fetcherFunction = fetchTopRated;
            break;
        case 'upcomings':
            fetcherFunction = fetchUpcoming;
            break;
        default:
            break;
    };

    const { isLoading, data } = useQuery<ITopRated>(['movie', theme], fetcherFunction);

    const setBannerAtom = useSetRecoilState(bannerAtom);

    if(theme === 'now_playing' || theme === 'tv_popular') {
        if(data?.results) {
            setBannerAtom(data?.results[0]);
        };
    };

    const [index, setIndex] = useState(0);

    const [leaving, setLeaving] = useState(true);

    const increaseIndex = () => {
        let NUM_OF_ROW;
        if(data?.results) {
            const LEN = data.results.length;
            NUM_OF_ROW = Math.floor(LEN / NUM_OF_BOX_IN_A_ROW) - BOX_OFFSET;
        };
        if(leaving) {
            setIndex(index === NUM_OF_ROW ? 0 : index + BOX_OFFSET)
            setLeaving(false);
        } else return;
    };

    const setClickedMovie = useSetRecoilState(movieAtom);

    const findClickedMovie = (id: number) => {
        const clickedMovie = data?.results.find(movie => movie.id === id);
        if(clickedMovie) setClickedMovie(clickedMovie);
    };

    return (
        <>
            <Slider
            style={{
                bottom: position
            }}
            >   
                <SlideTitle>{ theme?.toUpperCase() || '' }</SlideTitle>
                <NextBtn onClick={increaseIndex}>NEXT&rarr;</NextBtn>
                <AnimatePresence
                onExitComplete={() => setLeaving(true)}
                initial={false}
                >
                    <Row
                    key={index}
                    variants={sliderVariant}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ 
                        type: "linear", 
                        duration: 1 
                    }}
                    >
                        {
                            data?.results
                            .slice(theme === 'now_playing' ? BOX_OFFSET : 0)
                            .slice(index * NUM_OF_BOX_IN_A_ROW, index * NUM_OF_BOX_IN_A_ROW + NUM_OF_BOX_IN_A_ROW)
                            .map((movie, i) => {
                                return (
                                    <Box
                                    key={ i }
                                    variants={boxVariant}
                                    whileHover="hover"
                                    onClick={() => findClickedMovie(movie.id)}
                                    >
                                        <SlideBox 
                                        theme={ theme ?? '' }
                                        movieInfo={ movie }
                                        />
                                    </Box>
                                )
                            })
                        }
                    </Row>
                </AnimatePresence>
            </Slider>
        </>
    )
};

export default React.memo(SliderList);