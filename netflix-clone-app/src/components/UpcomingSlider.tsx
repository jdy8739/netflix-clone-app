import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useMatch } from "react-router";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { fetchTopRated, fetchUpcoming, ITopRated, IUpcoming } from "../api";
import { movieAtom } from "../atoms";
import { Box, Row, Slider } from "../routes/Home";
import SlideBox from "./SlideBox";

const NextBtn = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    position: absolute;
    top: -60px;
    right: 30px;
    background-color: red;
    color: red;
    cursor: pointer;
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

function UpcomingSlider() {

    const sliderVariant = {
        hidden: { x: window.innerWidth + 10 },
        visible: { x: 0 },
        exit: { x: -window.innerWidth - 10 }
    };

    const { isLoading, data: upcoming } = useQuery<IUpcoming>(['movie', 'upcoming'], fetchUpcoming);

    const [index, setIndex] = useState(0);

    const [leaving, setLeaving] = useState(true);

    const increaseIndex = () => {
        let NUM_OF_ROW;
        if(upcoming?.results) {
            const LEN = upcoming.results.length;
            NUM_OF_ROW = Math.floor(LEN / NUM_OF_BOX_IN_A_ROW) - 1;
        };
        if(leaving) {
            setIndex(index === NUM_OF_ROW ? 0 : index + 1)
            setLeaving(false);
        } else return;
    };

    const movieMatch = useMatch('/movie/:Id');

    const clickedUpcoming = 
    movieMatch?.params.Id && 
    upcoming?.results.find(movie => movie.id === Number(movieMatch?.params?.Id));

    const setSelectedMovie = useSetRecoilState(movieAtom);

    if(clickedUpcoming) {
        setSelectedMovie(clickedUpcoming);
    };

    return (
        <>
            <Slider 
            style={{
                bottom: '-450px'
            }}
            >
                <NextBtn onClick={increaseIndex}>&larr;</NextBtn>
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
                            upcoming?.results
                            .slice(BOX_OFFSET)
                            .slice(index * NUM_OF_BOX_IN_A_ROW, index * NUM_OF_BOX_IN_A_ROW + NUM_OF_BOX_IN_A_ROW)
                            .map((movie, i) => {
                                return (
                                    <Box
                                    key={ i }
                                    variants={boxVariant}
                                    whileHover="hover"
                                    >
                                        <SlideBox 
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

export default React.memo(UpcomingSlider);