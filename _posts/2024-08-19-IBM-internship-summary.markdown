---
layout: post
title:  "Summary of my 16-month internship at IBM"
date:   2024-08-19 16:27:00
category: Daily
image: /images/image-25.jpg
---

Starting from May 2023, I had my internship at IBM Canada. From learning all new things about our project's repositories and local deployment initially, I've gradually got familiar with the software development and devops cycle. I'm working under IBM's [Watson Code Assistant for Z (WCA4Z)](https://www.ibm.com/products/watsonx-code-assistant-z) project, and a member of the sub-team focusing on product called ["Reafactoring Assistant"](https://www.ibm.com/docs/en/watsonx/watsonx-code-assistant-4z/1.1?topic=refactor-overview).

This is view for one of the Markham Lab buildings.
![building_view](/images/image-25.jpg)

The lab has a geneous workspace provided for each employee, and I heard for my colleague the setups are designed 20 years ago where open space is not popular - such private space is insane comparing to most IT corporations.
![PWA_pic](/post-images/IBM_internship/PWA.jpg)

Throughout the internship, I've learned the genuine software development procedure and criteria that cannot be accessed in university courses, which is really invaluable for me.
- First of all, I grasped the sense of coding style, code structure design, and extensibility consideration by our team's strick code review. So, the normal procedure of a issue fix / feature implementation starts from a assigned Jira issue. Once starting on this issue, I'll create an individual branch using the issue number, and create a pull request to `release-next` branch when all implementations are finsihed. Only when codes receive approval from team leader and pass those auto-tests can the PR be merged. Every two or three months, `release-next` will be merged into main branch, meaning a new version is updated roughly every two months.

This is a large-team photo took when we held a barbecue party in July 2024.
![team-photo-bbq-party](/post-images/IBM_internship/group_photo.jpg)
- Secondly, this is the first time for me to maintain a part of our team's CI-CD pipeline. Originally, the products frontend has testing scripts but needed to be deployed and tested manually. What I did is to merge them into a Jenkins pipeline and execute it when a new build is finished. Furthermore, each testing result will be reported in the slack channel by jenkins plugin. This pipeline is hosted on a linux VM using headless chrome browser. This maintenance task helps me to solidify shell scripts and VM maintenance skills.
- Thirdly, after 6 months, our team continue to take charge of the vscode extension development (vscode adaption for refactoring assistant). Since this is a newly starting project, I gainde precious experience of observing and participating in the initial stage development of a commerial software product. I also made contributions in multiple functionality transition and extension-specific features.
- Lastly, as you can see, there are many repositories under development in our team, so there are always situations where changes have to be made in multiple branches. Although it's a torture for developer who got assigned to such issue (I've had such experience for serveral times), such experience greatly enhance my skills for analyzing the code and locating the essence of the problem.

To conclude, it's really a greatly experience to work in a challenging yet not very pushing environment. In addition to normal works, IBM has special events for interns, like the Future Blue Day where interns group in teams and do competitive activities for fun.
![FUBU-day](/post-images/IBM_internship/fubu_day.jpg)

I've also got the return offer from my manager. Still, I decided to decline the offer since my manager told me such decision in July 2024, while I've already started planning to apply for a graduate program in January 2024 - I want to seek for more opportunities and pursue more academic experience.

Will use several snow pictures took at Markham lab and my apartment to mark the end of my internship here at IBM Canada.
![snow_car](/post-images/IBM_internship/snow_car.jpg)

![snow_balcony](/post-images/IBM_internship/snow_balcony.jpg)