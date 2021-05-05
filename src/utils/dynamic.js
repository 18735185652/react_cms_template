import React, { lazy } from 'react';
import { Spin } from 'antd';

// const Loading = () => <div>loading</div>;

export default function dynamic(loadComponent) {
  const LazyComponent = lazy(loadComponent);
  return () => (
    <React.Suspense fallback={<Spin spinning />}>
      <LazyComponent />
    </React.Suspense>
  );
}
/*
function lazy(loadComponent){
    return class extends React.Component{
        state = {Component:null}
        componentDidMount(){
            loadComponent().then(res=>{
                this.setState({Component:res.default})
            })

        }
        render(){
            const {Component} = this.state;
            return (
                Component && <Component />
            )
        }
    }
}
*/
// export default dynamic;