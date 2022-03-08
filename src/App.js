import './App.css';
import React from 'react';
import Stack from './sdk/entry';
import { jsonToHTML } from "@contentstack/utils";

import detailJson from "./detail.json";
// {"_version":1,"locale":"en-us","uid":"blt856360a1567d9167","ACL":{},"_in_progress":false,"created_at":"2022-01-25T15:07:32.073Z","created_by":"blt7e329dbe668f3e6c","json_rte":{"type":"doc","attrs":{},"uid":"8750d7db4d3d4986acdc05d37d261fe9","children":[{"type":"p","attrs":{},"uid":"b2a45024099a43fc8c42e1408e42313e","children":[{"text":"This should render as a header"}]}],"_version":1},"tags":[],"title":"Test One","updated_at":"2022-01-25T15:07:32.073Z","updated_by":"blt7e329dbe668f3e6c","publish_details":{"environment":"blt758200fa1bb73656","locale":"en-us","time":"2022-01-25T15:12:25.894Z","user":"blt7e329dbe668f3e6c"},"_embedded_items":{}}

// let myJson = Stack.getJsonRte('new_ct', 'blt856360a1567d9167')


const renderOptions = {
  p: (node, next) => {
    console.log('this is a paragraph node: ', node.children)
    return `<p class='class-id'>${next(node.children)}</p>` // you will need to call next function with node children contents
    
  },
  h1: (node, next) => {
    return `<h1 class='class-id'>${next(node.children)}</h1>` // you will need to call next function with node children contents
  },
  bold: (text) => {
    return `<b>${text}</b>`
  },
  highlight: (text) => {
    return `<mark>${text}</mark>`
  },
  $default: (entry, metadata) => {
    return `<div>
        <h2>{${entry.title}}</h2>
        <p>{${entry.description}}</p>  
    </div>`
    },
  inline: {
    $default: (entry) => {
      return `<span><b>{${entry.title}}</b> - {${entry.description}}</span>`
    }
  },
  link: (entry, metadata) => {
    return `<a href="{${metadata.attributes.href}}">{${metadata.text}}</a>`
  },
  display: (asset, metadata) => {

    return `<img src="${asset.url}" alt={${JSON.stringify(metadata.attributes['asset-name'])}} />`
  },
  info: (node, next) => {
    return `<div class="tooltiptext">${next(node.children)}</div>`
  },
};

class App extends React.Component {

  state = {
    entry: {}
  };
  async componentDidMount() {
    let details = await Stack.getJsonRte('new_ct', 'blt856360a1567d9167')
    jsonToHTML({
      entry: details,
      paths: ["json_rte"],
      renderOption: renderOptions
    });
    this.setState({ entry: details });
    console.log(this.state.entry);
  }

  render() {
    console.log("entry", this.state.entry);
 
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: this.state.entry.json_rte
        }}
      ></div>
    );
  }
}

export default App;
