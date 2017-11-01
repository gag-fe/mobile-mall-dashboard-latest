import './index.less';
import React from 'react';
import TreeSelect from '@gag/tree-select-web';
import PropTypes from 'prop-types';
const TreeNode = TreeSelect.TreeNode;

class SearchTree extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      shopId:props.shopId,
      searchValue: '',
    };
  }

  onChange = (value, label, extra) => {
    if (!value) {
      return false
    }
    //const {store} = this.context;
    this.setState({
      shopId: value
    });
    this.props.onSelectOrgList(value, label, extra);
  }

  filterTreeNode = (inputValue, treeNode) => {
    inputValue = inputValue || ' ';
    if (inputValue.trim() != '') {
      return treeNode.props.text.toLowerCase().indexOf(inputValue.trim().toLowerCase()) != -1 ? true : false;
    } else {
      return true;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.shopId != nextProps.shopId) {
      this.setState({
        shopId: nextProps.shopId
      });
    }
  }

  onSearch = (value) => {
    this.setState({searchValue: value});
  }

  render() {
    let {orgList} = this.props;
    let {searchValue} = this.state;
    const loop = data => data.map((item) => {
      const index = item.name.indexOf(searchValue);
      const beforeStr = item.name.substr(0, index);
      const afterStr = item.name.substr(index + searchValue.length);
      const title = index > -1 ? (
        <span>
          {beforeStr}
          <strong>{searchValue}</strong>
          {afterStr}
        </span>
      ) : item.name;
      if (item.children && item.children.length) {
        return (
          <TreeNode key={item.id} value={item.id} text={item.name} disabled={item.isEmpty == 1} title={title}>
            {loop(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.id} value={item.id} text={item.name} disabled={item.isEmpty == 1} title={title}/>;
    });

    return (
      <div className="search-tree-wrap">
        <TreeSelect
          showLine
          showSearch
          onSearch={this.onSearch}
          style={{width: "100%"}}
          value={this.state.shopId||orgList[0]&&orgList[0].id}
          dropdownStyle={{maxHeight: 800, overflow: 'auto'}}
          searchPlaceholder="机构名称"
          treeNodeLabelProp='text'
          treeNodeFilterProp='text'
          treeDefaultExpandAll
          onChange={this.onChange}
          filterTreeNode={this.filterTreeNode}
        >
          {loop(orgList)}
        </TreeSelect>
      </div>

    );
  }

  componentWillMount() {
    //this.props.getOrgList();
  }
}
SearchTree.defaultProps = {
  orgList: [],
  onSelectOrgList:function(){},
  shopId:'',
};

SearchTree.propTypes = {
  orgList: PropTypes.array,
  onSelectOrgList:PropTypes.func,
  shopId:PropTypes.string,
};

export default SearchTree
