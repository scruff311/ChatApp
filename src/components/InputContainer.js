/**
 * Created by kevin on 10/12/17.
 */
import React, { Component } from 'react';
import SendIcon from 'react-icons/lib/md/send';
import { InputGroup, Button, FormGroup, FormControl } from 'react-bootstrap';
import FileInput from './FileInput';

class InputContainer extends Component {
  render() {
    const input = this.props.input;
    return (
      <form>
        <FormGroup>
          <InputGroup>
            <InputGroup.Addon>
              <FileInput
                name="myImage"
                accept=".png,.gif,.jpg"
                placeholder="My Image"
                className="inputClass"
                onChange={this.props.imageHandler}
              />
            </InputGroup.Addon>
            <FormControl onChange={this.props.changeHandler} value={input} />
            <InputGroup.Button>
              <Button
                bsStyle="primary"
                type="submit"
                onClick={this.props.submitHandler}
              >
                <SendIcon />
              </Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </form>
    );
  }
}

export default InputContainer;
