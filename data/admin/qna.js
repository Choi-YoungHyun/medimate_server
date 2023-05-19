import { Op } from "sequelize"
import { QNA } from '../../db/qna.js';

export async function getAll(page) {
    let limit = 10;
    let offset = (page - 1) * limit;
    return QNA.findAndCountAll({
        limit,
        offset,
        order: [
            ['Q_NUM', 'DESC']
        ]
    });
}

export async function getByUName(Q_TITLE, page) {
    let limit = 10;
    let offset = (page - 1) * limit;
    return QNA.findAndCountAll({
        limit,
        offset,
        order: [
            ['Q_NUM', 'DESC']
        ],
        where: { Q_TITLE: { [Op.like]: `%${Q_TITLE}%` } }
    });
}

export async function findByNum(U_NUM) {
    return QNA.findOne({ where: { U_NUM } }).then((data) => data.dataValues)
}

export async function findByName(U_NUM) {
    const UserNum = findByNum(U_NUM)
    return QNA.findOne({ where: { UserNum } })
}

export async function create(qna) {
    return QNA.create(qna).then((data) => data.dataValues.Q_NUM)
}

export async function update(Q_NUM, Q_CONTENT) {
    return QNA.findOne({ where: { Q_NUM } })
        .then((data) => {
            data.Q_CONTENT = Q_CONTENT
            return data.save()
        })
}



