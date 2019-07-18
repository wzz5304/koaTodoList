import * as React from 'react';

export interface TestProps {
    testProps: string
}
 
export interface TestState {
    testString: string
}
 
class Test extends React.Component<TestProps, TestState> {

    constructor(props: TestProps) {
        super(props);
        this.state = { 
            testString: 'testString'
        };
    }

    render() { 
        return (
            <div>
                xxxxx
                {
                    this.state.testString
                }
                {
                    this.props.testProps
                }
            </div>
        );
    }
}
 
export default Test;