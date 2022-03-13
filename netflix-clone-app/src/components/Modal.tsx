import styled from "styled-components";
import { INowPlayingResult } from "../api";
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

function Modal({ clickedMovie }: { clickedMovie?: INowPlayingResult }) {
    return (
        <ModalInfo>
            <ModalImage path={makeImagePath(clickedMovie?.backdrop_path || '')}>
                <Title>{ clickedMovie?.title }</Title>
            </ModalImage>
            <Overview>{ clickedMovie?.overview }</Overview>
        </ModalInfo>
    )
};

export default Modal;