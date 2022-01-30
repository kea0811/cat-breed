/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const { CancelToken } = axios || {};
const cancel = {};

const instance = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	timeout: 30000,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
});

/**
 * @param {string} path
 * @param {string} [param]
 * @param {object} [headers]
 * @param {string} [baseURL]
 * @description Method to call GET through Axios
 */
export const get = (path, param, headers, baseURL) => {
	if (baseURL) {
		instance.defaults.baseURL = baseURL;
	}
	if (cancel[path]) {
		cancel[path]();
		cancel[path] = undefined;
	}
	return instance.get(`${path}?${param === undefined ? '' : param}`, {
		...headers,
		cancelToken: new CancelToken(c => {
			cancel[path] = c;
		}),
	});
};

export default {
	get,
};
