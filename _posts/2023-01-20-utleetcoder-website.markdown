---
layout: post
title:  "UTLeetCoder - leetcode activities statistics website for registered UofT students"
date:   2022-09-22 20:11:00
category: Coding
image: /images/image-21.jpg
---
I've completed my web development course CSC309 at UofT last semester, and got some experience in building the backend and frontend of the website. So, together with my roommates Ethan and Thomas, we decided to build a website for UofT students to collect their leetcode activities and share their coding experience. Here is the link to our website: [UTLeetCoder](https://coder.xfttech.org/).

![daily_rank](/post-images/UTLeetCoder/1.png)

## Core Mechanism

While we decided to use React.js as the frontend, we plan to use vanilla javascript plus graphQL for getting the data from leetcode api as the backend. Here is the sample code for getting the recent submission of a user:

{% highlight javascript %}
const apiClient = axios.create({
    headers: { "Accept-Encoding": "gzip,deflate,compress" },
    baseURL: 'https://leetcode.com',
    timeout: 100000
})

export const getRecentSubmission = async (username) => {
    // console.log(username)
    const query = `{recentAcSubmissionList(username: "${username}", limit: 20) {id title titleSlug timestamp}}`
    return await apiClient.get("graphql?query=" + query);
}
{% endhighlight %}

## Strategies for arranging the data
First, we maintain a list of the registered users in the database (we didn't open the registration to public as we also created a wechat group for registered UofT students). Then, we maintain a local json format lists of files for each user, and implement the mechanism to query the api for updates every hour. Besides submission records, the returned message also contains difficulty and submission time.

With those submission data obtained, we split each user's data into daily rankings, daily easy/medium/hard difficulty countings, and maintain a user specific profile page. Here is the screenshot, and by clinking the colored bar, you can see detailed list of submissions in all history.

![user_profile](/post-images/UTLeetCoder/2.png)

Furthermore, we got the leetcode api for total problem solving and contest ranking, enabling us to setup a ranking podium for users - one for total problem solving, and one for contest ranking. 

## Frontend Design

For the frontend, we used React.js and Ant Design for the UI design. We also used React Router to implement the routing mechanism. Although there's not much to say about frontend programming, it really help me to re-familiarize with the React I learned from course and get more experience in React.