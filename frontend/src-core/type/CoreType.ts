import { ElForm, ElTable, ElTree } from 'element-plus';

import type Node from 'element-plus/es/components/tree/src/model/node';

/**
 * # 一些定义的类型
 * @author Hamm
 */

/**
 * # el-tree的实例 ref对象
 */
export type CoreTreeInstance = InstanceType<typeof ElTree>;

/**
 * # el-form的实例 ref对象
 */
export type CoreFormInstance = InstanceType<typeof ElForm>;

/**
 * # el-table的实例 ref对象
 */
export type CoreTableInstance = InstanceType<typeof ElTable>;

/**
 * # tree-node的原始对象
 */
export type CoreTreeNode = Node;

/**
 * #  图标类型字符串类型
 */
export type CoreIconType = 'DELETE_LIST' | 'DELETE' | 'EDIT' | 'DETAIL' | 'ADD' | 'FINISH' | 'SEARCH' | 'SETTING' | 'PUBLISH' | 'SAVE' | 'EXPORT' | 'IMPORT' | 'MORE' | 'LOCK' | 'UPLOAD' | 'LOGOUT' | 'DOWNLOAD' | 'CHECKIN' | 'SELECT' | 'MOVE_UP' | 'MOVE_DOWN' | 'CONFIRM' | 'CHECKBOX' | 'CLOCK' | 'MONITOR' | 'COMPARE' | 'CLOSE'
