import React, { Component } from 'react';
import { Button } from 'antd';


class FromPage extends Component {
    onclick = () => {
        //changeTheme('red');
    }
    render() {


        return (
            <div>
                <Button type="primary" onClick={this.onclick}>Primary</Button>
            </div>

        );
    }
}


export default FromPage





