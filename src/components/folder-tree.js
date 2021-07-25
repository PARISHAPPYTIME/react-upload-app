import { useState, useEffect, useRef } from 'react'
import { Layout, Tree, Affix } from 'antd'
import { withRouter } from 'react-router-dom'

import server from '@/utils/request'
const { DirectoryTree } = Tree;

const FolderTreeComponent = function (props) {

    const [treeData, setTreeData] = useState([])
    const [expandedKeys, setExpandedKeys] = useState([]);
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const treeRef = useRef(null)

    const changeKey = (arr) => {
        if (Array.isArray(arr) && arr.length > 0) {
            arr.forEach(el => {
                el.key = el.key.replaceAll('\\', 'O_O')
                changeKey(el.children)
            })
        }
        return arr
    }

    const getNodeData = (arr, key) => {
        let nodeData
        arr.forEach(el => {
            if (el.key === key) {
                nodeData = el
            } else {
                const val = getNodeData(el.children, key)
                if (val) nodeData = val
            }
        })
        return nodeData
    }

    useEffect(() => {
        const path = props.match.params.key || ''

        const arr = path.split('/')
        const newArr = arr.map((el, index, arr) => {
            const customArr = arr.slice(0, index + 1)
            const str = customArr.join('O_O')
            return str
        })

        async function getTreeData () {
            const res = await server({
                url: '/md/all',
                method: 'GET',
                params: {
                    searchPath: '/'
                }
            })
            const newTreeData = changeKey(res.data)
            setTreeData(newTreeData)
            setExpandedKeys(newArr);
            setSelectedKeys([newArr[newArr.length - 1]]);

            const item = getNodeData(newTreeData, newArr[newArr.length - 1])
            if (item) {
                if (item.isLeaf) {
                    const newKey = item.key.replaceAll('O_O', '/')
                    const codeRes = await server({
                        url: '/md',
                        method: 'GET',
                        params: {
                            searchPath: newKey
                        }
                    })
                    props.setContent(codeRes.data)
                } else {
                    props.setContent("# " + item.title)
                }
            }
        }
        getTreeData()
    }, [])



    const onSelect = (selectedKeysValue, info) => {
        const { isLeaf, key } = info.node
        const newKey = key.replaceAll('O_O', '/')
        setSelectedKeys(selectedKeysValue);
        props.history.push({
            pathname: `/folder/${newKey}`
        })
        if (isLeaf) {
            server({
                url: '/md',
                method: 'GET',
                params: {
                    searchPath: newKey
                }
            }).then(res => {
                props.setContent(res.data)
            })
        }
    };

    const onExpand = (key) => {
        setExpandedKeys(key);
        setAutoExpandParent(false);
    };

    return (
        <DirectoryTree
            ref={treeRef}
            showIcon={false}
            onExpand={onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            onSelect={onSelect}
            selectedKeys={selectedKeys}
            treeData={treeData}
        />
    )
}

export default withRouter(FolderTreeComponent)
