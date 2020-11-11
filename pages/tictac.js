import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Head from 'next/head';
import Link from 'next/link';
import Game from "../components/tictac.js";
import "../components/test.css";

class Test extends Component {
  state = {};
    render() {
      return <Game />;
    }
  }

export default Test;