import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { INowPlayingResult } from "../api";
import { movieAtom, tvAtom } from "../atoms";
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

function ModalTv() {

    const selectedTv = useRecoilValue(tvAtom);

    return (
        <ModalInfo>
            <ModalImage path={makeImagePath(selectedTv?.backdrop_path || '')}>
                <Title>{ selectedTv?.name }</Title>
            </ModalImage>
            <Overview>
                { 
                    selectedTv?.overview && selectedTv?.overview?.length > 400 ? 
                    selectedTv?.overview.slice(0, 420) + '...' : selectedTv?.overview
                }
            </Overview>
        </ModalInfo>
    )
};

export default ModalTv;