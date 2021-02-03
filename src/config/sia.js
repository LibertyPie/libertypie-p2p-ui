/**
 * LibertyPie (https://libertypie.com)
 * @author LibertyPie <hello@libertypie.com>
 * @license MIT
 * chainlink contracts addresses
 */
export default {
    endpoint: "https://siasky.net/skynet/",
    upload_path: 'skyfile',

    getUploadUrl(){
        return this.endpoint +"/"+ this.upload_path;
    }
}