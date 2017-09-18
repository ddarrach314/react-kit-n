import React from 'react';
import unboundActions from '../actions';
import store from '../reduxStore';
import {bindActionCreators} from 'redux';
import utilities from '../utilities/index';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

let actions = bindActionCreators(unboundActions, store.dispatch);

class OutputAction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }

  handleClickEdit() {
    actions.toggleEditActionModal(this.props.index);
  }

  handleClickRemove() {
    actions.removeOutputAction(this.props.index);
  }

  handleMouseEnter() {
    this.setState({hover: true});
  }

  handleMouseLeave() {
    this.setState({hover: false});
  }

  render() {
    return (
      <TableRow onMouseEnter={this.handleMouseEnter.bind(this)} 
        onMouseLeave={this.handleMouseLeave.bind(this)}>
        <TableRowColumn style={{paddingLeft: '0', paddingRight: '0', textAlign: 'center'}}>{this.props.outputAction.name}</TableRowColumn>
        <TableRowColumn style={{paddingLeft: '0', paddingRight: '0', textAlign: 'center'}}>{this.props.outputAction.target}</TableRowColumn>
        <TableRowColumn style={{paddingLeft: '0', paddingRight: '0', textAlign: 'center'}}>{this.props.outputAction.type}</TableRowColumn>
        {this.state.hover ?
          <TableRowColumn style={{paddingLeft: '0', paddingRight: '0'}}>
            <i className="material-icons pointer outputActionEditDelete purple" 
              onClick={this.handleClickEdit.bind(this)}>mode_edit</i>
            <i className="material-icons pointer purple" 
              onClick={this.handleClickRemove.bind(this)}>clear</i>
          </TableRowColumn>
          :
          <TableRowColumn></TableRowColumn>
        }
      </TableRow>
    );
  }
}

export default OutputAction;


// <div>
//         <div className="outputActionRow" 
//           onMouseEnter={this.handleMouseEnter.bind(this)} 
//           onMouseLeave={this.handleMouseLeave.bind(this)}>
//           <div className="outputActionCol">
//             <div>Name</div>
//             <div className="outputActionColValue">{this.props.outputAction.name}</div>
//           </div>
//           <div className="outputActionCol">
//             <div>Target</div>
//             <div className="outputActionColValue">{this.props.outputAction.target}</div>
//           </div>
//           <div className="outputActionCol">
//             <div>Type</div>
//             <div className="outputActionColValue">{this.props.outputAction.type}</div>
//           </div>
//           {this.state.hover ?
//             <div>
//               <i className="material-icons pointer" 
//                 onClick={this.handleClickEdit.bind(this)}>mode_edit</i>
//               <i className="material-icons removeOutputAction pointer red" 
//                 onClick={this.handleClickRemove.bind(this)}>clear</i>
//             </div>
//             :
//             <div className="outputActionMouseoverPlaceholder"></div>
//           }
//         </div>
//         <div className="borderBottomContainer"><div className="greyBorder"></div></div>
//       </div>