import { AnimatePresence } from "framer-motion";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import { bannerAtom, tvAtom, tvBannerAtom } from "../atoms";
import Modal from "../components/Modal";
import ModalTv from "../components/ModalTv";
import SliderListTv from "../components/SliderListTv";
import { makeImagePath } from "../utils";
import { Banner, Footer, ModalBackground, modalVariant, ModalWindow, Overview, PlayBtn, Title } from "./Home";

function Tv() {

    const banner = useRecoilValue(tvBannerAtom);

    let tvMatch = useMatch('/tv/:theme/:id');

    const nav = useNavigate();

    const handleOnClick = (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation();

    const tvAtomValue = useRecoilValue(tvAtom);

    if(!tvAtomValue) tvMatch = null;

    return (
        <>  
            <Banner 
                path={makeImagePath(banner ? banner.backdrop_path : '')}>
                    <div>
                        <Title>{ banner ? banner.name : '' }</Title>
                        <Overview>{ banner ? banner.overview : '' }</Overview>
                        <br></br>
                        <PlayBtn>watch</PlayBtn>
                    </div>
            </Banner>
            <SliderListTv theme={'tv_popular'} position={'150px'}/>
            <SliderListTv theme={'airing_today'} position={'-150px'}/>
            <SliderListTv theme={'tv_top_rated'} position={'-450px'}/>
            {
                tvMatch === null ? null : 
                <AnimatePresence>
                    <ModalBackground
                    key={tvMatch.params.id}
                    variants={modalVariant}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    onClick={() => nav('/tv')}
                    >
                        <ModalWindow 
                        layoutId={tvMatch?.params.theme ? tvMatch?.params.theme + tvMatch?.params.id : ''}
                        onClick={handleOnClick}>
                            <ModalTv />
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

export default Tv;