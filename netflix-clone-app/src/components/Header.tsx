import { motion, useAnimation, useTransform, useViewportScroll } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useMatch, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavBar = styled(motion.nav)`
    width: 100vw;
    height: 90px;
    display: flex;
    align-items: center;
    transition: all 1s;
    position: fixed;
    top: 0;
    z-index: 99;
`;

const Logo = styled(motion.svg)`
    width: 180px;
    height: 50%;
    color: rgba(255, 0, 0, 1);
    margin: 8px 8px 8px 50px;
`;

const Nav = styled.div`
    margin: 0;
    color: white;
    padding: 12px;
    position: relative;
`;

const SearchForm = styled(motion.form)`
    padding: 24px;
    display: flex;
`;

const Input = styled(motion.input)`
    transform-origin: right center;
    position: absolute;
    right: 0px;
    margin-right: 80px;
    margin-top: -15px;
    padding: 5px 10px;
    padding-left: 40px;
    z-index: -1;
    color: white;
    font-size: 16px;
    background-color: transparent;
    border: 1px solid white;
`;

const SearchIcon = styled(motion.img)`
    width: 25px;
    height: 20px;
`;

const RouteBall = styled(motion.div)`
    background-color: red;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
`;

const svgVariant = {
    start: {
        pathLength: 1,
        fill: "rgba(255, 0, 0, 1)"
    },
    whileHover: {
        pathLength: [0, 1, 0],
        fill: ["rgba(255, 0, 0, 1)", "rgba(255, 0, 0, 0)", "rgba(255, 0, 0, 1)"],
        transition: {
            repeat: Infinity,
            duration: 5,
        }
    }
};

function Header() {

    const homeMatch = useMatch('/');

    const tvMatch = useMatch('/tv');

    const { scrollY } = useViewportScroll();

    const navAnimation = useAnimation();

    const nav = useNavigate();

    useEffect(() => {
        scrollY.onChange(function() {
            if(scrollY.get() < 80) {
                navAnimation.start('top');
            } else navAnimation.start('scroll');
        });
    }, [scrollY]);

    const gradient = useTransform(
        scrollY,
        [0, 80],
        ["rgba(0, 0, 0, 0.1)", "rgba(0, 0, 0, 1.0)"]
    );

    const [keyword, setKeyword] = useState('');

    const searchKeyword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        nav(`/search?keyword=${keyword}`);
        setKeyword('');
    };

    const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => setKeyword(e.currentTarget.value);

    const inputAnimation = useAnimation();

    const iconAimation = useAnimation();

    const [searchOpen, setSearchOpen] = useState(false);

    const toggleSearch = () => {
        if (searchOpen) {
            inputAnimation.start({
                scaleX: 0,
            });
            iconAimation.start({
                x: 0,
                transition: {
                    type: 'linear'
                }
            });
        } else {
            inputAnimation.start({ scaleX: 1 });
            iconAimation.start({
                x: -250,
                transition: {
                    type: 'linear'
                }
            });
        }
        setSearchOpen((prev) => !prev);
    };

    return (
        <>
            <NavBar
            style={{ backgroundColor: gradient }}
            >
                <Logo
                xmlns="http://www.w3.org/2000/svg"
                width="1024"
                height="276.742"
                viewBox="0 0 1024 276.742"
                >
                    <motion.path
                    variants={svgVariant}
                    initial="start"
                    whileHover="whileHover"
                    stroke="white"
                    strokeWidth={5}
                    d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" />
                </Logo>
                <Nav>
                    <Link to="/">Home</Link>
                    {   
                        homeMatch !== null ?
                        <RouteBall 
                        layoutId="match-ball"/> : null
                    }
                </Nav>
                &emsp;
                <Nav>
                    <Link to="/tv">TV</Link>
                    {
                        tvMatch !== null ?
                        <RouteBall 
                        layoutId="match-ball"/> : null
                    }
                </Nav>
                <div style={{ flexGrow: 1 }}></div>
                <SearchIcon 
                src={require('../img/search_icon.png')}
                onClick={toggleSearch}
                animate={iconAimation}
                />
                <SearchForm 
                onSubmit={searchKeyword}
                animate={inputAnimation}
                initial={{ scaleX: 0 }}
                transition={{ type: "linear" }}
                >
                    <Input 
                    onChange={handleOnChange} 
                    value={keyword}
                    placeholder="Search for movie or tv show..."
                    />
                </SearchForm>
            </NavBar>
        </>
    )
};

export default Header;