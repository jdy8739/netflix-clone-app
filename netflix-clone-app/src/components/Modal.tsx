import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { INowPlayingResult } from "../api";
import { movieAtom } from "../atoms";
import { makeImagePath } from "../utils";

const ModalInfo = styled.div`
    background-color: rgb(34, 34, 36);
    width: 100%;
    height: 100%;
    color: white;
    text-align: center;
`;

const ModalImage = styled.div<{ path: string }>`
    background-image: linear-gradient(to top, black, transparent), url(${props => props.path});
    width: 100%;
    height: 70%;
    background-position: center center;
    background-size: cover;
    position: relative;
`;

const Title = styled.h1`
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    margin: auto;
`;

const Overview = styled.div`
    padding: 12px;
`;

function Modal() {

    const selectedMovie = useRecoilValue(movieAtom);

    return (
        <ModalInfo>
            <ModalImage path={makeImagePath(selectedMovie?.backdrop_path || '')}>
                <Title>{ selectedMovie?.title }</Title>
            </ModalImage>
            <Overview>
                { 
                    selectedMovie?.overview && selectedMovie?.overview?.length > 400 ? 
                    selectedMovie?.overview.slice(0, 420) + '...' : selectedMovie?.overview
                }
            </Overview>
        </ModalInfo>
    )
};

export default Modal;