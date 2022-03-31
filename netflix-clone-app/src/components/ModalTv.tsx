import { useRecoilValue } from "recoil";
import { tvAtom } from "../atoms";
import { makeImagePath } from "../utils";
import { ModalImage, ModalInfo, Overview, Title } from "./Modal";

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