import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchNowPlaying, INowPlaying } from "../api";
import SlideBox from "../components/SlideBox";
import { makeImagePath } from "../utils";

const Banner = styled.div<{ path: string }>`
    width: 100vw;
    height: 100vh;
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
`;

const Title = styled.h1`
    color: white;
    font-size: 120px;
    margin: 0;
`;

const Overview = styled.p`
    font-size: 20px;
    margin: 0;
    width: 70%;
`;

const Slider = styled.div`
    position: relative;
`;

const Row = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 10px;
    position: absolute;
    width: 100vw;
`;

const Box = styled(motion.div)`
    background-color: red;
    height: 150px;
    &:first-child {
        transform-origin: center left;
    };
    &:last-child {
        transform-origin: center right;
    }
`;

const BOX_OFFSET = 1;

const NUM_OF_BOX_IN_A_ROW = 6;

const boxVariant = {
    hover: {
        scale: 1.4,
        y: -50,
        zIndex: 100,
        transition: {
            type: 'tween'
        }
    }
};

function Home() {

    const sliderVariant = {
        hidden: { x: window.innerWidth + 10 },
        visible: { x: 0 },
        exit: { x: -window.innerWidth - 10 }
    };

    const { 
        isLoading: nowPlayingLoading, 
        data: nowPlaying } 
        = useQuery<INowPlaying>(['movies', 'now_playing'], fetchNowPlaying);

    const [index, setIndex] = useState(0);

    const [leaving, setLeaving] = useState(true);

    const increaseIndex = () => {
        let NUM_OF_ROW;
        if(nowPlaying?.results) {
            const LEN = nowPlaying.results.length;
            NUM_OF_ROW = Math.floor(LEN / NUM_OF_BOX_IN_A_ROW) - 1;
        };
        if(leaving) {
            setIndex(index === NUM_OF_ROW ? 0 : index + 1)
            setLeaving(false);
        } else return;
    };

    return (
        <>
            <Banner 
            onClick={increaseIndex}
            path={makeImagePath(nowPlaying?.results[0].backdrop_path || '')}>
                <div>
                    <Title>{ nowPlaying?.results[0].title }</Title>
                    <Overview>{ nowPlaying?.results[0].overview }</Overview>
                    <br></br>
                    <button>click</button>
                </div>
            </Banner>
            <Slider>
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
                            [0, 1, 2, 3, 4, 5].map(item => {
                                return (
                                    <Box 
                                    key={item}
                                    variants={boxVariant}
                                    whileHover="hover"
                                    >
                                        <SlideBox 
                                        movieInfo={ nowPlaying?.results[index * NUM_OF_BOX_IN_A_ROW + item + BOX_OFFSET] } />
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

export default Home;