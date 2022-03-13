import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router";
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
    height: 150px;
    &:first-child {
        transform-origin: center left;
    };
    &:last-child {
        transform-origin: center right;
    }
`;

const ModalBackground = styled(motion.div)`
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed;
    top: 0;
`;

const ModalWindow = styled(motion.div)`
    background-color: white;
    width: 460px;
    height: 300px;
    border-radius: 20px;
    position: absolute;
    left: 0;
    right: 0;
    top: ${window.innerHeight - window.innerHeight / 1.5}px;
    margin: auto;
`;

const modalVariant = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1
    }
};

const BOX_OFFSET = 1;

const NUM_OF_BOX_IN_A_ROW = 6;

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

    const movieMatch = useMatch('/movie/:Id');

    const nav = useNavigate();

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
                            nowPlaying?.results.slice(BOX_OFFSET)
                            .slice(index * NUM_OF_BOX_IN_A_ROW, index * NUM_OF_BOX_IN_A_ROW + NUM_OF_BOX_IN_A_ROW)
                            .map((movie, i) => {
                                return (
                                    <Box key={i}>
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
            {
                movieMatch === null ? null : 
                <AnimatePresence>
                    <ModalBackground
                    key={movieMatch.params.Id}
                    variants={modalVariant}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    onClick={() => nav('/')}
                    >
                        <ModalWindow layoutId={movieMatch?.params.Id}/>
                    </ModalBackground>
                </AnimatePresence>
            }
        </>
    )
};

export default Home;